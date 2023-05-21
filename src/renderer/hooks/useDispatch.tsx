import { useDispatch as reduxDispatch} from "react-redux";
import { TypedStore } from "../store/store";

export const useDispatch = reduxDispatch as () => TypedStore['dispatch'];
