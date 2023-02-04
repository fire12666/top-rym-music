import React, { useRef, useState } from 'react';
import './App.css';
import Home from './components/Home';
import YearlyTop from './components/YearlyTop';
import { useInView } from 'react-intersection-observer';
import YearNavigation from './components/YearNavigation';


function App() {
  const componentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [preventYearChange, setPreventYearChange] = useState<boolean>(false);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div className="App">
      <div ref={ref}></div>
      <Home />
      <YearNavigation components={componentRefs} show={!inView} activeYear={activeYear} setActiveYear={setActiveYear}
        setPreventYearChange={setPreventYearChange}/>
      <YearlyTop components={componentRefs} setActiveYear={setActiveYear} preventYearChange={preventYearChange}/>
    </div>
  );
}

export default App;
