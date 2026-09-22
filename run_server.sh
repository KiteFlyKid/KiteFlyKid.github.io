#!/bin/sh
set -eu
bundle exec jekyll serve --host 127.0.0.1 "$@"
