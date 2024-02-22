import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/landing/landing';

const routes = () => (
  <Routes>
    <Route path="/" element={<Landing/>} />
  </Routes>
);

export default routes;
