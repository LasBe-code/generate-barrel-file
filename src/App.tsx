import { ComponentDepth1 } from '@components/ComponentDepth1';
import { ComponentDepth2 } from '@components/ComponentDepth2/ComponentDepth2';
import { ComponentDepth3 } from '@components/ComponentDepth2/ComponentDepth3/ComponentDepth3';
import { PageDepth1 } from '@pages/PageDepth1';
import { PageDepth2_1 } from '@pages/PageDepth2/PageDepth2_1';
import { PageDepth2_2 } from '@pages/PageDepth2/PageDepth2_2';
import { PageDepth3 } from '@pages/PageDepth2/PageDepth3/PageDepth3';

function App() {
  return (
    <>
      <PageDepth1 />
      <PageDepth2_1 />
      <PageDepth2_2 />
      <PageDepth3 />
      <ComponentDepth1 />
      <ComponentDepth2 />
      <ComponentDepth3 />
    </>
  );
}

export default App;
