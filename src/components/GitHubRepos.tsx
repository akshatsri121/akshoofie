import { useEffect, useState } from 'react';
import './GitHubRepos.css';

type GitHubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

const endpoint =
  'https://api.github.com/users/akshatsri121/repos?sort=updated&per_page=100';

export default function GitHubRepos() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed');
        return response.json() as Promise<GitHubRepo[]>;
      })
      .then((repos) => {
        setRepositories(
          repos
            .filter((repo) => !repo.fork && !repo.archived)
            .sort(
              (left, right) =>
                new Date(right.updated_at).getTime() -
                new Date(left.updated_at).getTime(),
            )
            .slice(0, 4),
        );
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setStatus('error');
      });

    return () => controller.abort();
  }, []);

  if (status === 'loading') {
    return (
      <div
        className="repo-grid"
        aria-busy="true"
        aria-label="Loading GitHub repositories"
      >
        {[1, 2, 3, 4].map((item) => (
          <div className="repo-card repo-card--loading" key={item}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ))}
      </div>
    );
  }

  if (status === 'error' || !repositories.length) {
    return (
      <div className="repo-error">
        <p className="eyebrow">GitHub signal unavailable</p>
        <h3>Repositories are still online.</h3>
        <p>
          GitHub did not answer this request. Visit the full profile to browse
          every project.
        </p>
      </div>
    );
  }

  return (
    <div className="repo-grid">
      {repositories.map((repository, index) => (
        <article className="repo-card" key={repository.name}>
          <a href={repository.html_url} target="_blank" rel="noreferrer">
            <div className="repo-topline">
              <span>REPO_{String(index + 1).padStart(2, '0')}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{repository.name.replaceAll('-', ' ')}</h3>
            <p>
              {repository.description ??
                'Source files, experiments, and progress live here.'}
            </p>
            <div className="repo-meta">
              <span>
                <i aria-hidden="true"></i>
                {repository.language ?? 'Various'}
              </span>
              <span>★ {repository.stargazers_count}</span>
              <span>⑂ {repository.forks_count}</span>
            </div>
            <time dateTime={repository.updated_at}>
              Updated{' '}
              {new Date(repository.updated_at).toLocaleDateString('en-IN', {
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </a>
        </article>
      ))}
    </div>
  );
}
