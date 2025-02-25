import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createRelayRenderEnvironment() {
  // React에서 동작할 것!
  const network = Network.create(async (operation, variables, cacheConfig) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        query: operation?.text,
        variables,
      }),
      signal: cacheConfig.metadata?.signal as AbortSignal,
    });

    return await response.json();
  });

  const store = new Store(new RecordSource());

  return new Environment({
    network,
    store,
  });
}
