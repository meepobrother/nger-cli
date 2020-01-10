import { Observable, of, throwError } from 'rxjs';
import { FileDoesNotExistException } from '@nger/cli.exception';
import { Path, PathFragment } from '../path';
import { FileBuffer, HostCapabilities, ReadonlyHost, Stats } from './interface';

export class Empty implements ReadonlyHost {
  readonly capabilities: HostCapabilities = {
    synchronous: true,
  };

  read(path: Path): Observable<FileBuffer> {
    return throwError(new FileDoesNotExistException(path));
  }

  list(path: Path): Observable<PathFragment[]> {
    return of([]);
  }

  exists(path: Path): Observable<boolean> {
    return of(false);
  }

  isDirectory(path: Path): Observable<boolean> {
    return of(false);
  }

  isFile(path: Path): Observable<boolean> {
    return of(false);
  }

  stat(path: Path): Observable<Stats<{}> | null> {
    // We support stat() but have no file.
    return of(null);
  }
}
