import { getHero as getHeroQuery } from "../contentful/queries";

export async function getHero() {
  return getHeroQuery();
}

export default getHero;
