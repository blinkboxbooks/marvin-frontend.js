#!/bin/bash

# build
vagrant ssh-config | ssh -F /dev/stdin default 'cd /vagrant && grunt test;'