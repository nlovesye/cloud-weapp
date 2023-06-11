import { AppResponseBodyT, AppStatusEnum } from '@/model';

export function genAppResponseBodyT({
    status = AppStatusEnum.SUCCESS,
    message = 'success',
    data = null,
}: Partial<AppResponseBodyT> = {}): AppResponseBodyT {
    return {
        status,
        message,
        data,
    };
}
