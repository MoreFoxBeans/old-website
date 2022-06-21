const TribeFormat = [ "%noun% that %verb% the %noun%", "%noun% Where %adj% %noun% Swim", "%noun% With %noun% in %noun%", "%noun% of %adj% %noun%", "%adj% %noun% on %noun%", "%adj% %noun% Before %noun%", "%adj% %noun% Where %noun% %verb%", "%noun% that %verb% at %noun%", "%noun% Where %noun% %verb%", "%noun% Shining on %noun%", "%noun% that %verb% by %noun%", "%noun% of No %noun%", "%noun% that %verb% Down %noun%", "%noun% that %verb% to %noun%", "%noun% that %verb% Quickly", "%noun% that %verb% on %noun%", "%noun% Beneath %adj% %noun%", "%noun% Beneath %noun%", "%adj% %noun% Beside %noun%", "%noun% Falling on %noun%", "%noun% When %noun% %verb%", "%noun% at %noun%", "%noun% of the %adj% %noun%", "%noun% that %verb% in %noun%", "%noun% %noun% Over %noun%" ];
const TribeNoun = [ "Belly", "Bird", "Breeze", "Brook", "Cleft", "Cloud", "Crest", "Dawn", "Dusk", "Eagle", "Feather", "Fish", "Flight", "Hawk", "Heron", "Lark", "Leaves", "Mist", "Moon", "Moss", "Mountain", "Night", "Owl", "Path", "Pebble", "Pine", "Rain", "River", "Rock", "Screech", "Screen", "Shadow", "Sky", "Snow", "Splash", "Star", "Stars", "Stones", "Storm", "Storm Clouds", "Sunlight", "Swoop", "Talon", "Teller", "Thorn", "Water", "Waterfall", "Wind", "Wing", "Winter Sky" ];
const TribeAdj = [ "Angry", "Chestnut", "Dark", "Flying", "Gray", "Jagged", "Pointed", "Sheer", "Small", "Snowy", "Startled", "Still", "Swooping" ];
const TribeVerb = [ "Clings", "Grows", "Leaps", "Passes", "Rattles", "Rides", "Rolls", "Rustles", "Shimmers", "Shines", "Sings", "Sits" ];

const ClanPrefix = [ "Acorn", "Adder", "Alder", "Amber", "Ant", "Apple", "Arch", "Ash", "Aspen", "Badger", "Bark", "Bay", "Bee", "Beech", "Beetle", "Bella", "Berry", "Big", "Billy", "Birch", "Bird", "Black", "Blaze", "Blizzard", "Bloom", "Blossom", "Blue", "Bluebell", "Boulder", "Bounce", "Bracken", "Bramble", "Brave", "Breeze", "Briar", "Bright", "Brindle", "Bristle", "Broken", "Brown", "Bubbling", "Bug", "Bumble", "Buzzard", "Cedar", "Cherry", "Chestnut", "Chive", "Cinder", "Cinnamon", "Claw", "Clear", "Cloud", "Clover", "Cone", "Copper", "Creek", "Cricket", "Crooked", "Crouch", "Crow", "Curl", "Curly", "Cypress", "Daisy", "Dandelion", "Dangling", "Dapple", "Dark", "Dawn", "Dead", "Deer", "Dew", "Doe", "Dove", "Down", "Drizzle", "Drift", "Duck", "Dusk", "Dust", "Eagle", "Ebony", "Echo", "Eel", "Elder", "Ember", "Fallen", "Fallow", "Fawn", "Feather", "Fennel", "Fern", "Ferret", "Fidget", "Fin", "Finch", "Fire", "Flail", "Flame", "Flash", "Flax", "Fleet", "Flicker", "Flint", "Flip", "Flower", "Flutter", "Fly", "Fog", "Fox", "Freckle", "Fringe", "Frog", "Frond", "Frost", "Furze", "Fuzzy", "Golden", "Goose", "Gorse", "Grass", "Gravel", "Gray", "Green", "Gull", "Hail", "Half", "Hare", "Harry", "Harvey", "Hatch", "Haven", "Hawk", "Hay", "Hazel", "Heather", "Heavy", "Heron", "Hickory", "Hill", "Hollow", "Holly", "Honey", "Hoot", "Hop", "Hope", "Hound", "Ice", "Ivy", "Jagged", "Jay", "Jump", "Juniper", "Kestrel", "Kink", "Kite", "Lake", "Larch", "Lark", "Lavender", "Leaf", "Leopard", "Lichen", "Light", "Lightning", "Lily", "Lion", "Little", "Lizard", "Log", "Long", "Lost", "Loud", "Low", "Lynx", "Maggot", "Mallow", "Maple", "Marigold", "Marsh", "Meadow", "Midge", "Milk", "Milkweed", "Minnow", "Mint", "Mist", "Mistle", "Misty", "Mole", "Monkey", "Moon", "Morning", "Moss", "Mossy", "Moth", "Mottle", "Mouse", "Mud", "Mumble", "Myrtle", "Nectar", "Needle", "Nettle", "Newt", "Night", "Nut", "Oak", "Oat", "Odd", "Olive", "One", "Otter", "Owl", "Pale", "Parsley", "Patch", "Pear", "Pebble", "Perch", "Petal", "Pigeon", "Pike", "Pine", "Pink", "Plum", "Pod", "Pool", "Poppy", "Pounce", "Prickle", "Primrose", "Puddle", "Quail", "Quick", "Quiet", "Rabbit", "Ragged", "Rain", "Rat", "Raven", "Red", "Reed", "Riley", "Ripple", "River", "Robin", "Rock", "Rook", "Root", "Rose", "Rowan", "Rubble", "Running", "Rush", "Russet", "Rye", "Sage", "Sand", "Sandy", "Scorch", "Sedge", "Seed", "Shade", "Shadow", "Sharp", "Shattered", "Sheep", "Shell", "Shimmer", "Shining", "Shivering", "Short", "Shred", "Shrew", "Shy", "Silver", "Sky", "Slate", "Sleek", "Slight", "Sloe", "Small", "Smoke", "Snail", "Snake", "Snap", "Sneeze", "Snip", "Snook", "Snow", "Soft", "Song", "Soot", "Sorrel", "Spark", "Sparrow", "Speckle", "Spider", "Spike", "Spire", "Splash", "Spot", "Spotted", "Squirrel", "Stag", "Starling", "Star", "Stem", "Stoat", "Stone", "Stork", "Storm", "Strike", "Stumpy", "Sun", "Sunny", "Swallow", "Swamp", "Swan", "Sweet", "Swift", "Tall", "Talon", "Tangle", "Tansy", "Tawny", "Thistle", "Thorn", "Thrift", "Thrush", "Thunder", "Tiger", "Timber", "Tiny", "Toad", "Torn", "Trout", "Tulip", "Tumble", "Turtle", "Twig", "Vine", "Violet", "Vixen", "Vole", "Wasp", "Wave", "Weasel", "Web", "Weed", "Wet", "Whisker", "Whistle", "White", "Whorl", "Wild", "Willow", "Wind", "Wish", "Wolf", "Wood", "Woolly", "Wren", "Yarrow", "Yellow", "Yew" ];
const ClanSuffix = [ "bark", "beam", "bee", "belly", "berry", "bird", "blaze", "blossom", "branch", "breeze", "briar", "bright", "brook", "burr", "burrow", "bush", "claw", "cloud", "crawl", "creek", "dapple", "dawn", "dusk", "dust", "ear", "eater", "eye", "eyes", "face", "fall", "fang", "feather", "fern", "fire", "fish", "flake", "flame", "flight", "flower", "foot", "frost", "fur", "gorse", "hawk", "haze", "heart", "ice", "jaw", "leaf", "leap", "leg", "light", "mask", "minnow", "mist", "moon", "mouse", "muzzle", "needle", "nose", "pad", "peak", "pelt", "petal", "pool", "poppy", "pounce", "puddle", "rose", "ripple", "runner", "scar", "scratch", "seed", "shade", "shell", "shine", "sight", "skip", "sky", "slip", "snout", "snow", "song", "speck", "speckle", "spirit", "splash", "spot", "spots", "spring", "stalk", "stem", "step", "stone", "storm", "stream", "strike", "stripe", "swoop", "tail", "talon", "teeth", "thistle", "thorn", "throat", "toe", "tooth", "tuft", "watcher", "water", "whisker", "whisper", "whistle", "willow", "wind", "wing", "wish" ];

const AncientPrefix = [ "Acorn", "Alder", "Apple", "Black", "Birch", "Bright", "Broken", "Chasing", "Clear", "Cloud", "Cloudy", "Crow", "Dancing", "Dark", "Dawn", "Dew", "Dewy", "Drizzle", "Dove", "Dust", "Eagle", "Falcon", "Fallen", "Falling", "Fern", "Fish", "Flower", "Fluttering", "Furled", "Gray", "Half", "Hawk", "Hollow", "Jackdaw", "Jagged", "Jay", "Juniper", "Lapping", "Leaf", "Lightning", "Lion", "Melting", "Milkweed", "Misty", "Moon", "Morning", "Moss", "Moth", "Mouse", "Mud", "One", "Owl", "Pebble", "Pine", "Pink", "Quick", "Quiet", "Rainswept", "Raven", "Red", "Reed", "Rising", "River", "Running", "Shaded", "Sharp", "Shattered", "Shy", "Silver", "Snow", "Storm", "Sparrow", "Spotted", "Star", "Stone", "Strong", "Sun", "Swift", "Tall", "Thunder", "Tiny", "Turtle", "Twisted", "Violet", "Whispering", "White", "Willow", "Wind", "Yew" ];
const AncientSuffix = [ "Bird", "Blossom", "Bracken", "Branch", "Breeze", "Claw", "Clouds", "Cry", "Dawn", "Dusk", "Ear", "Eye", "Eyes", "Fawn", "Feather", "Flight", "Flower", "Foot", "Fox", "Frost", "Fur", "Hail", "Hare", "Heart", "Horse", "Ice", "Leaf", "Leaves", "Leap", "Lightning", "Minnow", "Mist", "Moon", "Moss", "Muzzle", "Needle", "Nose", "Paws", "Peak", "Pelt", "Petal", "Pounce", "Rain", "Ripple", "River", "Roar", "Runner", "Shadow", "Sky", "Song", "Spots", "Stream", "Stripe", "Sun", "Swoop", "Tail", "Tree", "Water", "Wave", "Whisker", "Whiskers", "Wing" ];

const Clan = document.getElementById('Clan');
const Ancient = document.getElementById('Ancient');
const Tribe = document.getElementById('Tribe');

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomClan() {
  return random(ClanPrefix) + random(ClanSuffix);
}

function randomAncient() {
  return random(AncientPrefix) + " " + random(AncientSuffix);
}

function randomTribe() {
  let format = random(TribeFormat);

  format = format.replaceAll('%noun%', () => random(TribeNoun));
  format = format.replaceAll('%adj%', () => random(TribeAdj));
  format = format.replaceAll('%verb%', () => random(TribeVerb));

  return format;
}

function generate() {
  Clan.innerText = `${randomClan()}, ${randomClan()}, ${randomClan()}`;
  Ancient.innerText = `${randomAncient()}, ${randomAncient()}`;
  Tribe.innerText = randomTribe();
}

function setup() {
  document.getElementById('generate').addEventListener('click', generate);
  
  generate();
}
