import { Box, Cyl, M } from './primitives';
import {
  Armchair,
  Bench,
  Bookshelf,
  Chair,
  CoffeeCounter,
  CoffeeTable,
  ConferenceTable,
  Desk,
  FilingCabinet,
  Plant,
  PendantLamp,
  RoundTable,
  Sofa,
  WallScreen,
} from './Furniture';
import { Person } from './Person';


const CEILING = 3.8;
const WALL_H = 3.7;

/** Structural beams under the ground-floor slab, running across the plan. */
function CeilingBeams({ lite }: { lite: boolean }) {
  const zs = lite ? [-2, -10, -18, -26, -34, -42, -50] : [-2, -6, -10, -14, -18, -22, -26, -30, -34, -38, -42, -46, -50];
  return (
    <group>
      {zs.map((z) => (
        <Box key={`beam-${z}`} p={[0, CEILING - 0.18, z]} s={[22, 0.36, 0.22]} m={M.slab} receive={false} />
      ))}
    </group>
  );
}

function CeilingLights() {
  const xs = [-6, 0, 6];
  const zs = [-9, -17, -25, -33, -41, -49];
  return (
    <group>
      {xs.flatMap((x) =>
        zs.map((z) => <Box key={`lamp-${x}-${z}`} p={[x, CEILING - 0.05, z]} s={[0.5, 0.03, 2.2]} m={M.lamp} receive={false} />)
      )}
    </group>
  );
}

function Walls() {
  return (
    <group>
      {/* Private offices: solid partitions and glazed fronts */}
      <Box p={[-6, WALL_H / 2, -34]} s={[0.15, WALL_H, 6]} m={M.plaster} />
      <Box p={[-6, WALL_H / 2, -40]} s={[0.15, WALL_H, 6]} m={M.plaster} />
      <Box p={[-1, WALL_H / 2, -37]} s={[0.15, WALL_H, 12]} m={M.plaster} />
      <Box p={[-6, WALL_H / 2, -37]} s={[10, WALL_H, 0.15]} m={M.plaster} />
      <Box p={[-6, WALL_H / 2, -31]} s={[10, WALL_H, 0.05]} m={M.glass} />
      <Box p={[-6, WALL_H / 2, -43]} s={[10, WALL_H, 0.05]} m={M.glass} />
      {/* Meeting room back walls (opaque, screens mounted on them) */}
      <Box p={[6, WALL_H / 2, -18.5]} s={[5, WALL_H, 0.12]} m={M.plaster} />
      <Box p={[6.5, WALL_H / 2, -29]} s={[7, WALL_H, 0.12]} m={M.plaster} />
      {/* Cafe north wall */}
      <Box p={[6, WALL_H / 2, -31.5]} s={[10, WALL_H, 0.15]} m={M.plaster} />
      {/* Corridor-side wall of the reception zone */}
      {/* Elevator core, opaque, on the right of the lobby */}
      <Box p={[8.6, CEILING / 2, -5]} s={[4.2, CEILING, 8]} m={M.plaster} />
      <Box p={[6.42, 1.1, -3.6]} s={[0.06, 2.2, 0.9]} m={M.chrome} />
      <Box p={[6.42, 1.1, -6.4]} s={[0.06, 2.2, 0.9]} m={M.chrome} />
      <Box p={[6.42, 2.9, -8.2]} s={[0.04, 0.3, 0.9]} m={M.exitGreen} />
      {/* Rear fire exit */}
      <Box p={[6.6, 1.1, -51.9]} s={[1.1, 2.2, 0.08]} m={M.frame} />
      <Box p={[6.6, 2.5, -51.85]} s={[0.9, 0.22, 0.04]} m={M.exitGreen} />
    </group>
  );
}

export function Interior({ lite = false }: { lite?: boolean }) {
  return (
    <group>
      <CeilingBeams lite={lite} />
      <CeilingLights />
      <Walls />

      {/* Reception */}
      <Box p={[0, 0.55, -7.5]} s={[5, 1.1, 0.9]} m={M.dark} />
      <Box p={[0, 1.13, -7.5]} s={[5.2, 0.06, 1.1]} m={M.oakLight} />
      <Box p={[0, 1.6, -11.6]} s={[9, 2.9, 0.12]} m={M.oak} />
      <Box p={[0, 2.35, -11.52]} s={[3.2, 0.45, 0.04]} m={M.lamp} />
      <Box p={[-1.6, 1.42, -7.95]} s={[0.6, 0.34, 0.03]} m={M.screen} />
      <Box p={[1.4, 1.42, -7.95]} s={[0.6, 0.34, 0.03]} m={M.screen} />
      <Box p={[1.4, 1.2, -7.85]} s={[0.06, 0.2, 0.06]} m={M.metal} />
      <Box p={[-1.6, 1.2, -7.85]} s={[0.06, 0.2, 0.06]} m={M.metal} />
      <Box p={[0, 1.2, -7.75]} s={[0.4, 0.02, 0.1]} m={M.white} />
      <Sofa position={[-9.6, 0, -6]} rotation={Math.PI / 2} length={2.2} m={M.sofaA} />
      <CoffeeTable position={[-7.6, 0, -6]} />
      <Armchair position={[-9.6, 0, -9.4]} rotation={Math.PI / 2} />
      <Plant position={[-10.2, 0, -2]} scale={1.1} />
      <Plant position={[-3.8, 0, -1.3]} scale={0.9} />
      <PendantLamp position={[0, 2.9, -4]} />
      <PendantLamp position={[-4.5, 2.9, -10]} />
      <Person position={[1.2, 0, -8.9]} rotation={Math.PI} pose="talk" palette={3} />
      <Person position={[-1.1, 0, -8.9]} rotation={Math.PI} pose="talk" palette={1} />
      <Person position={[-9.6, 0, -5.4]} rotation={-Math.PI / 2} pose="relax" palette={2} />
      <Person position={[-9.6, 0, -6.6]} rotation={-Math.PI / 2} pose="relax" palette={5} />
      <Person position={[-9.6, 0, -9.4]} rotation={Math.PI / 2 - Math.PI} pose="relax" palette={6} />

      {/* Main workspace: 12 desks, three rows of three and one row of three, with chairs */}
      {[
        [-7.5, -15, true],
        [-4, -15, false],
        [-0.5, -15, false],
        [-7.5, -19, false],
        [-4, -19, true],
        [-0.5, -19, false],
        [-7.5, -23, true],
        [-4, -23, false],
        [-0.5, -23, false],
        [-7.5, -27, false],
        [-4, -27, true],
        [-0.5, -27, true],
      ].map(([x, z, lampOn]) => (
        <Desk key={`ws-${x}-${z}`} position={[x as number, 0, z as number]} lamp={lampOn as boolean} />
      ))}
      <FilingCabinet position={[-10.3, 0, -14]} rotation={0} />
      <Plant position={[-10.3, 0, -25.5]} scale={1.2} />
      <Plant position={[-0.8, 0, -12.5]} scale={0.8} />
      <PendantLamp position={[-5.75, 2.9, -17]} />
      <PendantLamp position={[-5.75, 2.9, -25]} />
      <PendantLamp position={[-2.25, 2.9, -21]} />
      {/* Occupied desks */}
      <Person position={[-7.5, 0, -14.15]} pose="type" palette={0} phase={0} />
      <Person position={[-4, 0, -14.15]} pose="type" palette={4} phase={1.2} />
      <Person position={[-0.5, 0, -18.15]} pose="type" palette={2} phase={2.1} />
      <Person position={[-4, 0, -18.15]} pose="type" palette={7} phase={0.7} />
      <Person position={[-7.5, 0, -22.15]} pose="type" palette={3} phase={3.3} />
      <Person position={[-4, 0, -26.15]} pose="type" palette={5} phase={1.9} />
      <Person position={[-0.5, 0, -26.15]} pose="type" palette={6} phase={2.6} />
      {/* Two colleagues talking in the aisle */}
      <Person position={[-6.3, 0, -21]} rotation={-Math.PI / 2} pose="talk" palette={1} phase={0.4} />
      <Person position={[-4.9, 0, -21]} rotation={Math.PI / 2} pose="talk" palette={0} phase={1.5} />

      {/* Meeting room glass walls and mullions */}
      <Box p={[6, 1.6, -13.5]} s={[5, 3.2, 0.04]} m={M.glass} />
      <Box p={[3.5, 1.6, -16]} s={[0.04, 3.2, 5]} m={M.glass} />
      <Box p={[8.5, 1.6, -16]} s={[0.04, 3.2, 5]} m={M.glass} />
      <Box p={[6, 1.6, -23]} s={[7, 3.2, 0.04]} m={M.glass} />
      <Box p={[3, 1.6, -26]} s={[0.04, 3.2, 6]} m={M.glass} />
      <Box p={[10, 1.6, -26]} s={[0.04, 3.2, 6]} m={M.glass} />
      {[3.5, 8.5].map((x) => (
        <Box key={`ra-${x}`} p={[x, 1.6, -13.5]} s={[0.08, 3.2, 0.08]} m={M.frame} />
      ))}
      {[3, 10].map((x) => (
        <Box key={`rb-${x}`} p={[x, 1.6, -23]} s={[0.08, 3.2, 0.08]} m={M.frame} />
      ))}

      {/* Meeting room A (glass, centre x=6, z=-16) */}
      <Box p={[6, 0.75, -16]} s={[2.8, 0.06, 1.2]} m={M.oakLight} />
      <Cyl p={[6, 0.37, -16]} r={0.05} h={0.72} m={M.metal} />
      {[5, 6, 7].map((x) => (
        <Chair key={`ma-n-${x}`} position={[x, 0, -14.9]} rotation={0} />
      ))}
      {[5, 6, 7].map((x) => (
        <Chair key={`ma-s-${x}`} position={[x, 0, -17.1]} rotation={Math.PI} />
      ))}
      <WallScreen position={[6, 1.75, -18.38]} width={3.2} height={1.5} />
      <Person position={[5, 0, -14.9]} pose="sit" palette={4} phase={0.2} />
      <Person position={[7, 0, -14.9]} pose="sit" palette={1} phase={1.1} />
      <Person position={[5, 0, -17.1]} rotation={Math.PI} pose="sit" palette={6} phase={2.4} />

      {/* Meeting room B / conference (glass, centre x=6.5, z=-26) */}
      <ConferenceTable position={[6.5, 0, -26]} length={5} depth={1.6} />
      {[4.5, 5.5, 6.5, 7.5, 8.5].map((x) => (
        <Chair key={`cb-n-${x}`} position={[x, 0, -24.7]} rotation={0} />
      ))}
      {[4.5, 5.5, 6.5, 7.5, 8.5].map((x) => (
        <Chair key={`cb-s-${x}`} position={[x, 0, -27.3]} rotation={Math.PI} />
      ))}
      <WallScreen position={[6.5, 1.75, -28.9]} width={4.4} height={1.6} />
      <Person position={[4.5, 0, -24.7]} pose="sit" palette={5} phase={0.6} />
      <Person position={[6.5, 0, -24.7]} pose="sit" palette={0} phase={1.8} />
      <Person position={[8.5, 0, -24.7]} pose="sit" palette={3} phase={2.9} />
      <Person position={[5.5, 0, -27.3]} rotation={Math.PI} pose="sit" palette={2} phase={0.9} />
      <Person position={[7.5, 0, -27.3]} rotation={Math.PI} pose="sit" palette={7} phase={2.2} />
      <Person position={[6.5, 0, -28.1]} rotation={Math.PI} pose="talk" palette={4} phase={1.1} />
      <Plant position={[9.5, 0, -28.2]} scale={0.8} />

      {/* Private offices, 2 x 2, glazed fronts on Z=-31 */}
      <Desk position={[-9, 0, -35.5]} lamp={true} accessories={true} />
      <Bookshelf position={[-9.8, 0, -36.85]} rotation={0} width={1.8} />
      <FilingCabinet position={[-10.55, 0, -33.6]} rotation={Math.PI / 2} width={0.9} />
      <Plant position={[-6.7, 0, -32.2]} scale={0.9} />
      <PendantLamp position={[-8.6, 2.9, -34.5]} />
      <Person position={[-9, 0, -34.65]} pose="type" palette={6} phase={0.3} />

      <Desk position={[-3.5, 0, -35.5]} lamp={false} accessories={true} />
      <Plant position={[-1.9, 0, -32.4]} scale={0.9} />
      <PendantLamp position={[-3.5, 2.9, -34.5]} />

      <Desk position={[-9, 0, -40.4]} rotation={Math.PI} lamp={true} accessories={true} />
      <Bookshelf position={[-10.7, 0, -40]} rotation={Math.PI / 2} width={2} />
      <PendantLamp position={[-8.6, 2.9, -40.5]} />
      <Person position={[-9, 0, -41.25]} rotation={Math.PI} pose="type" palette={1} phase={1.4} />

      <Desk position={[-3.5, 0, -40.4]} rotation={Math.PI} lamp={false} accessories={false} />
      <Plant position={[-1.9, 0, -42.2]} scale={1} />
      <PendantLamp position={[-3.5, 2.9, -40.5]} />

      {/* Lounge (x -11..-1, z -44..-52) */}
      <Box p={[-6, 0.012, -48.5]} s={[6, 0.02, 4.4]} m={M.rug} receive={false} />
      <Sofa position={[-6, 0, -51.2]} rotation={0} length={3.2} m={M.sofaB} />
      <Sofa position={[-6, 0, -45.8]} rotation={Math.PI} length={3.2} m={M.sofaA} />
      <CoffeeTable position={[-6, 0, -48.5]} />
      <Armchair position={[-9.2, 0, -48.5]} rotation={Math.PI / 2} />
      <Armchair position={[-2.9, 0, -48.5]} rotation={-Math.PI / 2} />
      <Box p={[-10.7, 1.4, -48]} s={[0.3, 2.8, 6]} m={M.oak} />
      <Plant position={[-10.2, 0, -51]} scale={1.3} />
      <Plant position={[-1.9, 0, -50.5]} scale={1.1} />
      <Bench position={[-7, 0, -43.4]} rotation={Math.PI} />
      <PendantLamp position={[-6, 2.9, -48.5]} />
      <Person position={[-6.4, 0, -50.9]} rotation={Math.PI} pose="relax" palette={4} phase={0.8} />
      <Person position={[-5.4, 0, -46]} rotation={0} pose="relax" palette={7} phase={2.4} />
      <Person position={[-9.2, 0, -48.5]} rotation={-Math.PI / 2} pose="talk" palette={5} phase={1.7} />

      {/* Cafe (x 1..11, z -33..-52) */}
      <CoffeeCounter position={[10.1, 0, -42]} length={8.5} />
      <Box p={[10.5, 2.5, -42]} s={[0.6, 0.8, 8.5]} m={M.plaster} />
      <Box p={[10.1, 1.22, -39.5]} s={[0.5, 0.4, 0.5]} m={M.metal} />
      <Box p={[10.1, 1.22, -44.5]} s={[0.5, 0.4, 0.5]} m={M.metal} />
      <Box p={[10.1, 1.5, -39.5]} s={[0.2, 0.12, 0.2]} m={M.warmLamp} />
      <RoundTable position={[5, 0, -36]} chairs={[true, false, true, true]} />
      <RoundTable position={[5, 0, -41]} chairs={[true, true, true, false]} />
      <RoundTable position={[8, 0, -46]} chairs={[false, true, true, true]} />
      <RoundTable position={[5, 0, -48]} chairs={[true, false, false, false]} />
      <Plant position={[2, 0, -33.2]} scale={1} />
      <Plant position={[2.1, 0, -51.2]} scale={1} />
      <PendantLamp position={[5, 2.9, -36]} />
      <PendantLamp position={[5, 2.9, -41]} />
      <PendantLamp position={[8, 2.9, -46]} />
      <Person position={[5, 0, -35.15]} pose="sit" palette={5} phase={0.5} />
      <Person position={[4.15, 0, -36]} rotation={-Math.PI / 2} pose="sit" palette={0} phase={1.6} />
      <Person position={[5.85, 0, -41]} rotation={Math.PI / 2} pose="sit" palette={2} phase={2.8} />
      <Person position={[5, 0, -41.85]} rotation={Math.PI} pose="sit" palette={6} phase={0.9} />
      <Person position={[8.8, 0, -41.5]} rotation={-Math.PI / 2} pose="talk" palette={4} phase={1.3} />
    </group>
  );
}
