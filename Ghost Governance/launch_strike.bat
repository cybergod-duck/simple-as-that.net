@echo off
REM ============================================================
REM  STAT-2026-STRIKE Launcher
REM  Runs the Ghost Governance orchestrator pipeline.
REM  Called by Windows Task Scheduler on an hourly schedule.
REM ============================================================

cd /d "c:\Users\ovjup\Dropbox\VNR  Projects\simple-as-that.org\Ghost Governance"
python stat_2026_strike_orchestrator.py
