/*
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const detectPort = require('detect-port');
const express = require('express');
const serveIndex = require('serve-index');

const CliArgParser = require('../lib/cli-arg-parser');
const {ExitCode} = require('../lib/constants');
const {TEST_DIR_RELATIVE_PATH} = require('../lib/constants');

module.exports = {
  async runAsync() {
    const cliArgs = new CliArgParser();
    const {port} = cliArgs;

    if (await detectPort(port) !== port) {
      console.error(`Error: HTTP port ${port} is already in use!`);
      process.exit(ExitCode.HTTP_PORT_ALREADY_IN_USE);
    }

    const app = express();

    app.use('/', express.static(TEST_DIR_RELATIVE_PATH), serveIndex(TEST_DIR_RELATIVE_PATH));

    app.listen(port, () => {
      console.log(`
==========================================================
Local development server running on http://localhost:${port}/
==========================================================
`);
    });
  },
};
