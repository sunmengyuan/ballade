#!/bin/bash
gulp entries
gulp delete
npm run build
gulp stamps
gulp inline
gulp clear
