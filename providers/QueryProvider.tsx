import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Queries를 refetch할 때 window에 초점이 맞지 않으면 재고
      staleTime: 60 * 1000, // 쿼리 결과가 60초 동안 고정된 상태로 유지되도록 설정합니다.
    },
  },
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
