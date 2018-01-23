#!/bin/bash
gulp entries
gulp delete
npm run build
gulp stamps
gulp copy
gulp inline
gulp clear
