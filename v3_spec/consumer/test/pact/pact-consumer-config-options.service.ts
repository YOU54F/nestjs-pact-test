import * as path from 'path';
import { Injectable } from '@nestjs/common';
import {
  PactV3ConsumerOptionsFactory,
  PactV3ConsumerOverallOptions,
} from 'nestjs-pact';
import {
  SpecificationVersion
} from '@pact-foundation/pact';
import { execSync } from "child_process";
import { versionFromGitTag } from "absolute-version";


@Injectable()
export class PactV3ConsumerConfigOptionsService
  implements PactV3ConsumerOptionsFactory {
  createPactV3ConsumerOptions(): PactV3ConsumerOverallOptions {
    const gitSha = versionFromGitTag();
    const branch = execSync("git rev-parse --abbrev-ref HEAD")
    .toString()
    .trim()

    return {
      consumer: {
        // port: 1234, // You can set the port explicitly here or dynamically (see setup() below)
        // log: path.resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pact','pacts'),
        logLevel: 'info',
        spec: SpecificationVersion.SPECIFICATION_VERSION_V3,
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