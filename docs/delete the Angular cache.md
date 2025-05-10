Stop-Process -Name "ng" -Force -ErrorAction SilentlyContinue

Remove-Item -Path '.angular\cache' -Recurse -Force

Get-ChildItem -Path '.angular\cache' -Recurse | Remove-Item -Force -Recurse