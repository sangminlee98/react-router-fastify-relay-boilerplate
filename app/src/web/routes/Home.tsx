import { graphql } from "react-relay";
import type { HomeQuery } from "../__relay__/HomeQuery.graphql";
import { relayQueryLoader } from "../relay/relayQueryLoader";
import { useRelayQueryLoaderData } from "../relay/useRelayQueryLoaderData";

const query = graphql`
  query HomeQuery {
    ping
  }
`;

export const loader = relayQueryLoader<HomeQuery>({
  query,
  variables: () => ({}),
});

export default async function Home() {
  const data = useRelayQueryLoaderData<typeof loader>(query);

  return <div>{data.ping}</div>;
}
