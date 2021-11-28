import stopStatusMapper from "../constant/stopStatus";

export default function calEstimatedTime(data = []) {
  const direction1 = [];
  const direction2 = [];
  data.forEach((item) => {
    if (item.Direction === 0) {
      direction1.push(item);
    } else if (item.Direction === 1) {
      direction2.push(item);
    } else {
      console.error("公車資訊的Direction不如預期", item, item.Direction);
    }
  });

  const calBusStopInfo = (status, estimatedTime) => {
    if (status === 0) {
      const time = Math.ceil(estimatedTime / 60);
      return time ? `${time}分` : "進站中";
    }
    return stopStatusMapper[status];
  };

  const convertEstimatedInfo = (arr) =>
    arr.reduce((pre, cur) => {
      const { StopName, StopStatus, EstimateTime } = cur;
      if (pre[StopName.Zh_tw]) {
        pre[StopName.Zh_tw].push(calBusStopInfo(StopStatus, EstimateTime));
      } else {
        pre[StopName.Zh_tw] = [calBusStopInfo(StopStatus, EstimateTime)];
      }
      return pre;
    }, {});

  return [convertEstimatedInfo(direction1), convertEstimatedInfo(direction2)];
}
