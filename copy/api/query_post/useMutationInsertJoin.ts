import { useMutation } from '@tanstack/react-query';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  id: string;
  hp: string;
  date_time: Json[] | null; // 투표일 [{"]2024. 10. 11": [{time: "09:00"}]}]
};

type ReturnValue = {
  schedule_id: string | null;
  hp: string | null;
  date_time: Json[] | null; // 투표 대상 날짜/시간
};

const useMutationInsertJoin = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, hp, date_time }: Props) => {
      const { data, error } = await supabase
        .from('schedule_grab')
        .upsert(
          {
            schedule_id: id,
            hp: hp,
            date_time: date_time,
          },
          {
            onConflict: 'schedule_id, hp',
          },
        )
        .select();

      if (error) throw new Error('err 이게 뭔 에러여.. useMutationInsertJoin : ' + error.message);

      return data;
    },
    onSuccess: async () => {
      // console.log('일정 투표 완료');
      // queryClient.invalidateQueries({ queryKey: ['home'] });
    },
    onError: (err) => {
      console.log('errrr  ', err);
    },
  });
};

export default useMutationInsertJoin;
export type { Props as useMutationInsertJoinProps };
export type { ReturnValue as useMutationInsertJoinReturnValueProps };

//###### 사용부
/*
  const { mutateAsync: insertJoin } = useMutationInsertJoin();

  handleSubmit((data) => {
    const params: useMutationInsertJoinProps = {
      id: id,
      hp: value,
      date_time: data.selected_days,
    };

    console.log('params;:: ', params);

    insertJoin(params, {
      onSuccess: (data) => {
        router.replace('/public/joinComplete');
      },
    });
  })();  // <<< 유의할 부분
 */
