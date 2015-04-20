#!/bin/bash

npm test

RESULT=$?

cat ./coverage/karma/lcov.info | ./node_modules/codecov.io/bin/codecov.io.js

exit $RESULT


