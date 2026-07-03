// Fellowship person id (team or contributor, from
// dictionaries/<locale>/fellowship.json) -> portrait. Kept out of the
// dictionaries so the same asset isn't duplicated per language. People with no
// entry here render an honest monogram plate on the fellowship page.
export const teamPhotos: Record<string, string> = {
  "david-jandres": "/team/david-jandres.jpg",
  munkenbeck: "/team/george-munkenbeck.jpg",
  chambers: "/team/mark-chambers.jpg",
  oberg: "/team/michael-oberg.jpg",
  sebor: "/team/mollie-sebor.jpg",
  "brewster-walker": "/team/sandi-brewster-walker.jpg",
};
