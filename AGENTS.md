<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure

- Build the canteen experience as TanStack file routes with a shared React app shell, because this workspace supports TanStack Start rather than Angular.
- Keep cross-route wishlist state in a context mounted above the root outlet, so the dashboard and Bucket always show the same saved items.
- Keep app-wide theme state in a provider mounted above the root outlet, so the settings choice affects every route and persists consistently.
