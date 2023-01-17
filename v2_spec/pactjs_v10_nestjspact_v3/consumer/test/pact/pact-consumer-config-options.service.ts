import * as path from 'path';
import { Injectable } from '@nestjs/common';
import {
  PactConsumerOptionsFactory,
  PactConsumerOverallOptions,
} from 'nestjs-pact';
import { execSync } from "child_process";
import { versionFromGitTag } from "absolute-version";


@Injectable()
export class PactConsumerConfigOptionsService
  implements PactConsumerOptionsFactory {
  createPactConsumerOptions(): PactConsumerOverallOptions {
    const gitSha = versionFromGitTag();
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim()

    return {
      consumer: {
        // port: 1234, // You can set the port explicitly here or dynamically (see setup() below)
        log: path.resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pact','pacts'),
        logLevel: 'info',
        spec: 2,
      },
      publication: {
        pactFilesOrDirs: [path.resolve(process.cwd(), 'pact', 'pacts')],
        pactBroker: 'https://test.pactflow.io',
        pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
        pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
        consumerVersion: gitSha,
        tags: [branch],
        branch
      },
    };
  }
}