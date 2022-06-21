import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../app/store";

// 加了這個呼叫端在使用useSelector時，就不用一直要宣告型別
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;