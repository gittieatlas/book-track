import { createStackNavigator } from 'react-navigation';
import ProductScan from './src/components/ProductScan';
import HomeScreen from './src/components/Home';
import ProductInfo from './src/components/ProductInfo';
import ProductList from './src/components/ProductList';

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Scan: { screen: ProductScan },
  Info: { screen: ProductInfo },
  List: { screen: ProductList }
});

export default App;
