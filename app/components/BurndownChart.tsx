import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";


export function BurndownChart() {
    
  const theoriticalAvailableAmountPerDay = useSelector( state => state.transactions.theoriticalAvailableAmountPerDay );
  const realAvailableAmountPerDay = useSelector( state => state.transactions.realAvailableAmountPerDay );

  const today = new Date();
  const numberOfDays = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

  const getDaysOfMonth = () => {
    let dayOfMonth = [];
    for(let i = 0 ; i < numberOfDays; ++i) {
      dayOfMonth.push((i+1).toString());
    }
    return dayOfMonth;
  }
  const getHidePointsAt = () => {
    let hidePointsAt = [1,2,3,5,6,7,8,10,11,12,13,15,16,17,18,20,21,22,23,25,26,27];
    if(numberOfDays >= 30) {
      hidePointsAt.push(28);
    }
    if(numberOfDays >= 31) {
      hidePointsAt.push(29);
    }
    return hidePointsAt;
  }

  const days = getDaysOfMonth();
  const hidePointsAt = getHidePointsAt();

  const withDots = realAvailableAmountPerDay.length === 1;

  return (
    <View style={ { alignSelf: "center"}}>
      { (theoriticalAvailableAmountPerDay!.length > 0 && realAvailableAmountPerDay!.length > 0 && days!.length > 0 && hidePointsAt!.length > 0) && 
        <LineChart
          data={{
            labels: days,
            datasets: [
              {
                data: theoriticalAvailableAmountPerDay,
                withDots: false,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
              }, 
              { data: realAvailableAmountPerDay, withDots: withDots },
              { data: days.map( _=> 0),
                strokeWidth: 1,
                withDots: false,
                color: (opacity = 1) => `rgba(255, 0, 0, 1)` }
            ]
          }}
          width={Math.min(Dimensions.get("window").width - 20, 580)} // from react-native
          yLabelsOffset={5}
          height={220}
          yAxisSuffix="€"
          hidePointsAtIndex={ hidePointsAt }
          yAxisInterval={5}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            fillShadowGradientFrom: "#fff",
            fillShadowGradientTo: "#fff",
            color: (opacity = 1) => `rgba(100, 100, 255, 1)`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,
            propsForBackgroundLines: {
              strokeOpacity: 0.3
            },
            useShadowColorFromDataset: true,
            propsForDots: {
              r: "1",
              strokeWidth: "5",
              stroke: "blue"
            }
          }}
          style={{
            //marginVertical: 8,
            borderRadius: 8
          }}
        />
      }
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};