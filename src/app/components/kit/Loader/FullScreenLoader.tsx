import { Loader } from './Loader';

export const FullScreenLoader = () => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
    <Loader/>
  </div>
);