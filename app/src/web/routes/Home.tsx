import { Route } from "./+types/Home";

export function loader({ request, params, context }: Route.LoaderArgs) {
  context.app.env.COOKIE_SECRET;
}

export default function Home() {
  return <div>Hello World 1234</div>;
}
