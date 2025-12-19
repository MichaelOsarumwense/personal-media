#!/usr/bin/env bash
set -euo pipefail

# Commits and tags each lecture stub sequentially on a `course` branch.
# Usage: bash scripts/course-commit-and-tag.sh

ensure_branch() {
  if git rev-parse --verify course >/dev/null 2>&1; then
    git checkout course
  else
    git checkout -b course
  fi
}

commit_and_tag() {
  local n title file tag
  for i in $(seq -w 01 30); do
    n="$i"
    file=$(ls "course-outline/Lecture ${n} - "*.md 2>/dev/null | head -n 1 || true)
    if [[ -z "${file}" ]]; then
      echo "[WARN] Missing lecture file for #${n}; skipping"
      continue
    fi
    title=$(basename "${file}" .md)
    title=${title#"Lecture ${n} - "}

    # Stage only this file and commit
    git reset --quiet
    git add "${file}"
    if git diff --cached --quiet; then
      echo "[INFO] No changes for Lecture ${n} – ${title}; creating empty commit to maintain history"
      git commit --allow-empty -m "Lecture ${n} – ${title}"
    else
      git commit -m "Lecture ${n} – ${title}"
    fi

    tag="lecture-${n}"
    if git rev-parse "${tag}" >/dev/null 2>&1; then
      git tag -f -a "${tag}" -m "${title} – end state"
    else
      git tag -a "${tag}" -m "${title} – end state"
    fi
  done
}

echo "[INFO] Preparing course branch and committing lecture stubs..."
ensure_branch
commit_and_tag

echo "[DONE] Course branch prepared. Recent commits:"
git --no-pager log --oneline -n 5
echo "\nTags:"
git tag -n

