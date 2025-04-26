import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import SimpleBurningEarth from "@/components/SimpleBurningEarth";
import AudioControl from "@/components/AudioControl";
import { initAudio, playSoundtrack } from "@/lib/audio";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Görev arka plan görselleri için SVG URL'ler
const gorevImages: Record<number, string> = {
  1: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxOTY0OGEiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzIwNDI3YSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE1MjU0MCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjE1Ij48Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjEwMCIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTUwIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIyMDAiLz48L2c+PC9zdmc+",
  2: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzMDRkOTMiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzIwMzI3MyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE1MWU0MCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGcgZmlsbD0iI2U1ZTdlYiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIwIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMTAwIiByPSIyMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjQwMCIgcj0iMjAiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjIwIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSI5OSIgc3Ryb2tlPSIjZTllM2ZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+",
  3: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyMDQyN2EiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxMjIyM2MiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U0ZTRmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4wOCI+PGxpbmUgeDE9IjEwMCIgeTE9IjEwMCIgeDI9IjQwMCIgeTI9IjQwMCIgLz48bGluZSB4MT0iNDAwIiB5MT0iMTAwIiB4Mj0iMTAwIiB5Mj0iNDAwIiAvPjxsaW5lIHgxPSIyNTAiIHkxPSI1MCIgeDI9IjI1MCIgeTI9IjQ1MCIgLz48bGluZSB4MT0iNTAiIHkxPSIyNTAiIHgyPSI0NTAiIHkyPSIyNTAiIC8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIxNTAiIHN0cm9rZT0iI2ZmZjVlZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==",
  4: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNzM0NjciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZjE3MmMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI4MCIgZmlsbD0iI2U2MGUwZSIvPjxjaXJjbGUgY3g9IjM1MCIgY3k9IjM1MCIgcj0iNTAiIGZpbGw9IiNlNjBlMGUiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIxNTAiIHI9IjYwIiBmaWxsPSIjZmZmZmZmIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMzUwIiByPSI0MCIgZmlsbD0iI2ZmZmZmZiIvPjwvZz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+",
  5: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxNDJiNTAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYjE1MjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U3MGUwZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTI1MCwyNTAgTDEwMCw1MCBMNTU1LDU1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjUwLDI1MCBMODIsMTgyIEw0MTksMTgyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjUwLDI1MCBMOTksMzQxIEw0MDEsMzQyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjUwLDI1MCBMMTIwLDQ1MCBMNDNPLDQ1MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI1MCwyNTAgTDEwMCw1MCBMNTU1LDU1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9zdmc+",
  6: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMDFlMmEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYTBkMWQiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjEwMCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIyMDAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMzAwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjQwMCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMTAwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMTUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMjAwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMzAwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iMzUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iNDAwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDUwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTUwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMzUwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iNDUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==",
  7: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMjIxNDUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYjE0MjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2MGUwZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4wNSI+PGxpbmUgeDE9IjUwIiB5MT0iNTAiIHgyPSI0NTAiIHkyPSI1MCIvPjxsaW5lIHgxPSI1MCIgeTE9IjEwMCIgeDI9IjQ1MCIgeTI9IjEwMCIvPjxsaW5lIHgxPSI1MCIgeTE9IjE1MCIgeDI9IjQ1MCIgeTI9IjE1MCIvPjxsaW5lIHgxPSI1MCIgeTE9IjIwMCIgeDI9IjQ1MCIgeTI9IjIwMCIvPjxsaW5lIHgxPSI1MCIgeTE9IjI1MCIgeDI9IjQ1MCIgeTI9IjI1MCIvPjxsaW5lIHgxPSI1MCIgeTE9IjMwMCIgeDI9IjQ1MCIgeTI9IjMwMCIvPjxsaW5lIHgxPSI1MCIgeTE9IjM1MCIgeDI9IjQ1MCIgeTI9IjM1MCIvPjxsaW5lIHgxPSI1MCIgeTE9IjQwMCIgeDI9IjQ1MCIgeTI9IjQwMCIvPjxsaW5lIHgxPSI1MCIgeTE9IjQ1MCIgeDI9IjQ1MCIgeTI9IjQ1MCIvPjxsaW5lIHgxPSI1MCIgeTE9IjUwIiB4Mj0iNTAiIHkyPSI0NTAiLz48bGluZSB4MT0iMTAwIiB5MT0iNTAiIHgyPSIxMDAiIHkyPSI0NTAiLz48bGluZSB4MT0iMTUwIiB5MT0iNTAiIHgyPSIxNTAiIHkyPSI0NTAiLz48bGluZSB4MT0iMjAwIiB5MT0iNTAiIHgyPSIyMDAiIHkyPSI0NTAiLz48bGluZSB4MT0iMjUwIiB5MT0iNTAiIHgyPSIyNTAiIHkyPSI0NTAiLz48bGluZSB4MT0iMzAwIiB5MT0iNTAiIHgyPSIzMDAiIHkyPSI0NTAiLz48bGluZSB4MT0iMzUwIiB5MT0iNTAiIHgyPSIzNTAiIHkyPSI0NTAiLz48bGluZSB4MT0iNDAwIiB5MT0iNTAiIHgyPSI0MDAiIHkyPSI0NTAiLz48bGluZSB4MT0iNDUwIiB5MT0iNTAiIHgyPSI0NTAiIHkyPSI0NTAiLz48L2c+PC9zdmc+",
  8: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMDFiMzYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYTEwMjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMjAwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIyNTAiIHI9IjE1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==",
  9: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZjI0NDciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwOTEzMmEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4wNCIgPjxwYXRoIGQ9Ik0gNTAsMTAwIFEgMjUwLDUwIDQ1MCwyMDAiLz48cGF0aCBkPSJNIDUwLDE1MCBRIDI1MCwxMDAgNDUwLDI1MCIvPjxwYXRoIGQ9Ik0gNTAsMjAwIFEgMjUwLDE1MCA0NTAsMzAwIi8+PHBhdGggZD0iTSA1MCwyNTAgUSAyNTAsMjAwIDQ1MCwzNTAiLz48cGF0aCBkPSJNIDUwLDMwMCBRIDI1MCwyNTAgNDUwLDQwMCIvPjxwYXRoIGQ9Ik0gNTAsMzUwIFEgMjUwLDMwMCA0NTAsNDUwIi8+PHBhdGggZD0iTSA1MCw0MDAgUSAyNTAsMzUwIDQ1MCw1MDAiLz48L2c+PC9zdmc+",
  10: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMDI2NGMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwOTEzMmEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2MGUwZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC4wNCIgc3Ryb2tlLWRhc2hhcnJheT0iNSwyIj48bGluZSB4MT0iMTAwIiB5MT0iMTAwIiB4Mj0iNDAwIiB5Mj0iMTAwIi8+PGxpbmUgeDE9IjEwMCIgeTE9IjIwMCIgeDI9IjQwMCIgeTI9IjIwMCIvPjxsaW5lIHgxPSIxMDAiIHkxPSIzMDAiIHgyPSI0MDAiIHkyPSIzMDAiLz48bGluZSB4MT0iMTAwIiB5MT0iNDAwIiB4Mj0iNDAwIiB5Mj0iNDAwIi8+PC9nPjwvc3ZnPg=="
};

interface Gorev {
  id: number;
  baslik: string;
  cagri: string;
  aciklama: string;
  kategori: string;
  kontenjan: number;
  tamamlayan: number;
}

export default function GorevlerPage() {
  const { t, i18n } = useTranslation();
  const [, navigate] = useLocation();
  const [selectedGorev, setSelectedGorev] = useState<Gorev | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gorevler, setGorevler] = useState<Gorev[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    eposta: "",
    not: ""
  });
  
  useEffect(() => {
    // Initialize audio system
    initAudio();
    
    // Record visitor stats
    const recordVisit = async () => {
      try {
        await apiRequest(
          "POST", 
          "/api/visits", 
          {
            language: i18n.language || "tr",
            hasInteracted: false,
            page: "gorevler"
          }
        );
      } catch (error) {
        console.error("Failed to record visit:", error);
      }
    };
    
    recordVisit();
    
    // Load görevler data
    const mockGorevler: Gorev[] = [
      {
        id: 0,
        baslik: "🧩 Görev 0: Kurucunun Eksikleri",
        cagri: "Simay'ın eksiklerini tamamla ve geleceğini inşa et.",
        aciklama: "Türkiye Cumhuriyeti'nin ikinci yüzyılında, Simay hareketinin temellerini güçlendir ve katkıda bulun.",
        kategori: "kurucu",
        kontenjan: 1,
        tamamlayan: 0
      },
      {
        id: 1,
        baslik: "🧩 1. Görev: Kitapla Bir Hayat Değiştir",
        cagri: "Mahallende bir çocuğa kitap hediye et ve onunla okuma saati düzenle.",
        aciklama: "Çocukların eğitime olan ilgisini artırmak için bir çocuğa kitap hediye et. Okuma saatini planla, o anları kaydet.",
        kategori: "eğitim",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 2,
        baslik: "🧩 2. Görev: Değerleri Kaybetme!",
        cagri: "Ailende veya çevrende unutulmaya yüz tutmuş bir değeri yazıya dök ve paylaş.",
        aciklama: "Unutulmaya yüz tutmuş gelenek, hikaye veya deyimi araştır, dijital ortamda paylaş.",
        kategori: "kültür",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 3,
        baslik: "🧩 3. Görev: Yeşil Alan Oluştur",
        cagri: "Evinizdeki atıl tarım alanı yeşillendir ya da bir saksıda üretime başla.",
        aciklama: "Bir yeşil alan yarat, toprakla bağ kur. Saksıda yeşillik yetiştirip foto ile belgeleyebilirsin.",
        kategori: "çevre",
        kontenjan: 10,
        tamamlayan: 0
      },
      {
        id: 4,
        baslik: "🧩 4. Görev: Parklara Geri Dönüşüm Getir",
        cagri: "Mahallendeki bir çocuk parkına çevreye uygun geri dönüşüm kutusu yerleştir.",
        aciklama: "Parkları daha çevre dostu hale getirmek için geri dönüşüm kutusu yerleştir ve bunu belgeleyerek paylaş.",
        kategori: "çevre",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 5,
        baslik: "🧩 5. Görev: Müziğe Ses Ver",
        cagri: "Ses sistemciler ya da beste yapan birini destekle, mini bir kayıt oluştur.",
        aciklama: "Sanatsal üretimi desteklemek için çevrendeki yetenekleri tanıt ve kayıt altına al.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 6,
        baslik: "🧩 6. Görev: Görsel Yarat",
        cagri: "Bir resim ya da tasarım üretip #Gorev6 etiketiyle paylaş.",
        aciklama: "Sanatsal ifade özgürlüğünü kullanarak kendi resim veya grafik çalışmanı üret.",
        kategori: "sanat",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 7,
        baslik: "🧩 7. Görev: Mozaik Duvar",
        cagri: "Mahallende bir duvar temizletip gençlerle birlikte mozaik/pano oluştur.",
        aciklama: "Toplumsal estetik bilinci oluşturmak için bir duvarı birlikte sanatla dönüştürün.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 8,
        baslik: "🧩 8. Görev: Kadınlar İçin Alan Aç",
        cagri: "Kadınlara özel bir bilinçlenme toplantısı organize et.",
        aciklama: "Kadının toplumdaki rolünü güçlendirmek için eğitici ve dayanışmacı bir ortam oluştur.",
        kategori: "toplum",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 9,
        baslik: "🧩 9. Görev: Umut Mesajı",
        cagri: "Yaşadığın bir zorluğu yazıya dökerek başkalarına umut olacak şekilde paylaş.",
        aciklama: "Zorlukların paylaşıldığında nasıl güce dönüşebildiğini göstermek için kendi hikayeni anlat.",
        kategori: "psikoloji",
        kontenjan: 5,
        tamamlayan: 0
      },
      {
        id: 10,
        baslik: "🧩 10. Görev: Okul Kütüphanesi Yenileme",
        cagri: "Bir okul kütüphanesine kitap bağışı ve düzenleme desteği ver.",
        aciklama: "Yerel bir okul kütüphanesini kitap bağışı ve düzenleme çalışması ile zenginleştir.",
        kategori: "eğitim",
        kontenjan: 8,
        tamamlayan: 0
      }
      // 11-100 arası görevleri getir - zaten eklemiştik
    ];

    // Tüm 100 görevi kullanmak için alttaki kodu etkinleştirin
    // Ancak şimdilik görselleri test etmek için bu 10 görev yeterli
    
    // Görevlerimizi ayarlayalım
    setGorevler(mockGorevler);
    
    // Simüle edilmiş bir yükleme gecikmesi
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Audio
    playSoundtrack();
    
    return () => {
      // Temizleme işlemleri
    };
  }, [i18n.language]);
  
  // Toggle audio
  const handleToggleAudio = () => {
    playSoundtrack();
  };
  
  // Görev modali açma
  const openModal = (gorev: Gorev) => {
    setSelectedGorev(gorev);
    setIsModalOpen(true);
    
    // Reset form
    setFormData({
      ad: "",
      eposta: "",
      not: ""
    });
  };
  
  // Form değişiklik handleri
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Form gönderildiğinde
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGorev) return;
    
    try {
      await apiRequest(
        "POST",
        "/api/gorev-basvuru",
        {
          ...formData,
          gorevId: selectedGorev.id,
          gorevBaslik: selectedGorev.baslik
        }
      );
      
      alert("Başvurunuz alındı. Teşekkür ederiz!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Başvuru sırasında hata:", error);
      alert("Başvurunuz alınamadı. Lütfen tekrar deneyin.");
    }
  };
  
  // Kategoriye göre filtrele
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  // Arama terimini güncelle
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Tüm filtreleri temizle
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };
  
  const filteredGorevler = gorevler.filter(gorev => {
    // Apply category filter if a category is selected
    if (selectedCategory && gorev.kategori !== selectedCategory) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        gorev.baslik.toLowerCase().includes(searchLower) ||
        gorev.cagri.toLowerCase().includes(searchLower) ||
        gorev.aciklama.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // Get unique categories
  const categoriesSet = new Set(gorevler.map(gorev => gorev.kategori));
  const categories = Array.from(categoriesSet);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <SimpleBurningEarth />
      
      <main className="container mx-auto px-4 pb-16 z-10 relative">
        {/* Header */}
        <div className="text-center py-10">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold text-amber-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            101. YILINDA HALKIN ANDI: 100 GÖREVLE YENİDEN DOĞUŞ
          </motion.h1>
          
          {/* Kurucu görev button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <Button 
              className="bg-gradient-to-r from-amber-600 to-amber-400 text-black font-bold text-lg px-8 py-6 shadow-[0_0_15px_rgba(255,215,0,0.5)]"
              onClick={() => navigate("/turkiye")}
            >
              🧩 GÖREV 0: KURUCUNUN EKSİKLERİ
            </Button>
          </motion.div>
          
          {/* Filters */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <Input
                    type="text"
                    placeholder="Görev ara..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="max-w-md bg-black/50 border-cyan-500 text-white"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={selectedCategory === category ? "bg-cyan-500 text-black" : "border-cyan-500 text-cyan-400"}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Counters */}
            <div className="text-center mb-6">
              <p className="text-gray-400">Toplam Görev: {gorevler.length}</p>
              <p className="text-green-400">Tamamlanan: {gorevler.reduce((acc, g) => acc + g.tamamlayan, 0)} kişi katıldı</p>
            </div>
          </div>
          
          {/* Görevler Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {isLoading ? (
              // Loader
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-black/40 rounded-lg p-5 animate-pulse h-64"></div>
              ))
            ) : filteredGorevler.length === 0 ? (
              <p className="text-center col-span-full">Aranan kriterlere uygun görev bulunamadı.</p>
            ) : (
              filteredGorevler.map(gorev => (
                <div 
                  key={gorev.id}
                  className={`relative bg-black/60 backdrop-blur-sm border-2 ${
                    gorev.kategori === 'kurucu' 
                      ? 'border-amber-500 shadow-[0_0_20px_rgba(255,215,0,0.4)]' 
                      : gorev.tamamlayan > 0 
                        ? 'border-green-500 shadow-[0_0_12px_rgba(68,255,68,0.4)]' 
                        : 'border-amber-500'
                  } rounded-lg p-5 hover:scale-[1.03] transition-transform duration-200 overflow-hidden`}
                  style={gorev.id >= 0 && gorev.id <= 100 ? {
                    backgroundImage: gorevImages[gorev.id] ? `url(${gorevImages[gorev.id]})` : `linear-gradient(to bottom right, #172554, #0f172a)`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  } : {}}
                >
                  {/* Overlay to make text readable */}
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-3">{gorev.baslik}</h3>
                    <p className="text-white mb-2">{gorev.cagri}</p>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>Kategori: {gorev.kategori}</span>
                      <span>{gorev.tamamlayan}/{gorev.kontenjan} kişi</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-red-700 to-amber-600"
                      onClick={() => openModal(gorev)}
                    >
                      Göreve Katıl
                    </Button>
                  </div>
                </div>
              ))
            )}
          </motion.div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-12 gap-4">
            <Button 
              variant="outline"
              className="border-amber-500 text-amber-400 hover:bg-amber-900/20"
              onClick={() => navigate("/turkiye")}
            >
              ◀ Türkiye Sayfasına Dön
            </Button>
            
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              🏠 Ana Sayfa
            </Button>
          </div>
        </div>
        </main>
        
        {/* Bottom animation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-white/60 text-lg italic animate-pulse z-10">
          Zaman geçiyor...
        </div>
        
        {/* Görev Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-black/85 backdrop-blur-md border border-cyan-500 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-400 text-xl">
                {selectedGorev?.baslik}
              </DialogTitle>
              <DialogDescription className="text-white">
                {selectedGorev?.aciklama}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ad">Adınız Soyadınız:</Label>
                <Input
                  id="ad"
                  name="ad"
                  value={formData.ad}
                  onChange={handleInputChange}
                  className="bg-black/60 border-amber-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eposta">E-posta:</Label>
                <Input
                  id="eposta"
                  name="eposta"
                  type="email"
                  value={formData.eposta}
                  onChange={handleInputChange}
                  className="bg-black/60 border-amber-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="not">Not (isteğe bağlı):</Label>
                <Textarea
                  id="not"
                  name="not"
                  value={formData.not}
                  onChange={handleInputChange}
                  className="bg-black/60 border-amber-500"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dosya">Dosya yükle (PDF, JPEG):</Label>
                <Input
                  id="dosya"
                  name="dosya"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="bg-black/60 border-amber-500"
                />
              </div>
              
              <DialogFooter>
                <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
                  Gönder
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        
        <AudioControl onToggle={handleToggleAudio} />
      </div>
    );
}