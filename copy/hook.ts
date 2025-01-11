import { useQuery } from '@tanstack/react-query';
import { supabase } from '~/utils/supabase';

const useCopyHook = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: async () => {
      const { data, error } = await supabase.from('schedule').select('*').single();

      if (error || !data) {
        throw new Error('An error occurred while fetching data: ' + error?.message);
      }

      return data;
    },
  });
};

export default useCopyHook;
