import { BaseException } from '@nger/cli.exception';
import { JobName } from './api';

export class JobNameAlreadyRegisteredException extends BaseException {
  constructor(name: JobName) {
    super(`Job named ${JSON.stringify(name)} already exists.`);
  }
}

export class JobDoesNotExistException extends BaseException {
  constructor(name: JobName) {
    super(`Job name ${JSON.stringify(name)} does not exist.`);
  }
}
