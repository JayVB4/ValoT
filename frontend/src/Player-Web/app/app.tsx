// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Navbar from 'src/components/Navbar';
import AddTournament from "../components/AddTournament";
import Navbar from "../components/Navbar"; // Use relative path
import Test from "../components/Test";

export function App() {
  return (
    <div>
      <Navbar />
      {/* <AddTournament />  */}
      <Test />
    </div>
  );
}

export default App;
