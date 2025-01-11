import { useQuery } from '@tanstack/react-query';
import { useAuth } from '~/providers/AuthProvider';
import { supabase } from '~/utils/supabase';

type Props = {
  // date: string;
};

// type Return = Database['public']['Tables']['schedule']['Row'];
type ReturnValue = {
  created_at: string;
  id: number;
};

const useTestList = (props: Props) => {
  // const { session } = useAuth(); // 테스트 인 경우 or

  return useQuery<Array<ReturnValue>>({
    queryKey: ['test'],
    queryFn: async () => {
      // if (isEmpty(session)) return [];

      const { data, error } = await supabase.from('test_table').select(`*`);

      if (error || !data) {
        throw new Error('An error occurred while fetching data: ' + error?.message);
      }

      return data;
    },
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export default useTestList;

// ### 사용부
//  const { data, isLoading, refetch } = useTestList({ date: '' });
