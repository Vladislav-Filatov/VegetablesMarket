import type {RootState, AppDispatch} from "./store.ts";
import {useDispatch, useSelector, type TypedUseSelectorHook} from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

