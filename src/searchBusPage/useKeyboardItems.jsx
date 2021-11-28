import { useCallback } from "react";
import { ReactComponent as Del } from "../images/del.svg";

export default function useKeyboardItems(
  search,
  setSearch,
  setShowCitySelector,
  city,
  inputEle
) {
  const appendToSearch = useCallback(
    (val) => setSearch(search.concat(val)),
    [search, setSearch]
  );

  return [
    { event: () => setShowCitySelector(true), span: 60, label: city.label },
    { event: () => inputEle.current.focus(), span: 40, label: "手動輸入" },
    { event: () => appendToSearch("紅"), span: 20, label: "紅" },
    { event: () => appendToSearch("藍"), span: 20, label: "籃" },
    { event: () => appendToSearch("1"), span: 20, label: "1" },
    { event: () => appendToSearch("2"), span: 20, label: "2" },
    { event: () => appendToSearch("3"), span: 20, label: "3" },
    { event: () => appendToSearch("綠"), span: 20, label: "綠" },
    { event: () => appendToSearch("棕"), span: 20, label: "棕" },
    { event: () => appendToSearch("4"), span: 20, label: "4" },
    { event: () => appendToSearch("5"), span: 20, label: "5" },
    { event: () => appendToSearch("6"), span: 20, label: "6" },
    { event: () => appendToSearch("橘"), span: 20, label: "橘" },
    { event: () => appendToSearch("小"), span: 20, label: "小" },
    { event: () => appendToSearch("7"), span: 20, label: "7" },
    { event: () => appendToSearch("8"), span: 20, label: "8" },
    { event: () => appendToSearch("9"), span: 20, label: "9" },
    { event: () => appendToSearch("幹線"), span: 20, label: "幹線" },
    { event: () => appendToSearch("more"), span: 20, label: "更多" },
    { event: () => appendToSearch("C"), span: 20, label: "C" },
    { event: () => appendToSearch("0"), span: 20, label: "0" },
    { event: () => setSearch(search.slice(0, -1)), span: 20, label: <Del /> },
  ];
}
