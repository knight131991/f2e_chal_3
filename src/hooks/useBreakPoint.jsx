import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function useBreakPoint() {
  const screens = useBreakpoint();
  return (
    Object.entries(screens)
      .filter((screen) => !!screen[1])
      .pop() || [""]
  );
}
