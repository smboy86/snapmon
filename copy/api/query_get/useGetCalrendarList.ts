import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useAuth } from '~/providers/AuthProvider';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  date: string;
};

// type Return = Database['public']['Tables']['schedule']['Row'];
type ReturnValue = {
  schedule_id: string | null;
  title: string | null;
  status: string | null;
  member_cnt: number | null; // 참여 인원
  confirm_date: Json | null; // 확정일 2024. 10. 11
};

const useGetCalrendarList = (props: Props) => {
  const { session } = useAuth();

  return useQuery<Array<ReturnValue>>({
    queryKey: ['home'],
    queryFn: async () => {
      if (isEmpty(session)) return [];

      const { data, error } = await supabase
        .from('schedule')
        .select(`schedule_id, title, status, member_cnt, confirm_date`)
        .eq('user_id', session.user.id)
        .eq('status', '확정')
        // .filter('metadata->>created_at', 'gte', '2023-01-01')
        .order('created_at', { ascending: false });

      if (error || !data) {
        throw new Error('An error occurred while fetching data: ' + error?.message);
      }

      return data;
    },
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export default useGetCalrendarList;

// ### 사용부
//  const { data, isLoading, refetch } = useGetCalrendarList({ date: '' });
