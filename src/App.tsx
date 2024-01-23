import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import CharacterList from "./CharacterList";

function App(): JSX.Element {
  const queryClient: QueryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CharacterList />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;