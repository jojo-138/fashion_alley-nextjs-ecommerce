export default function formatProductDesc(details, inventory) {
  let { colors, imgs } = details;

  colors = colors.split(', ');

  //group images by color
  imgs = imgs.split(', ');

  let imgAmt = imgs.length / colors.length;
  let imgObj = {};
  let j = 0;

  for (let i = 0; i < imgs.length; i += imgAmt) {
    if (!imgObj[colors[j]]) imgObj[colors[j]] = imgs.slice(i, i + imgAmt);
    j++;
  }

  imgs = imgObj;

  //group available sizes by color
  const sizeInventory = {};

  inventory.forEach((item) => {
    if (!sizeInventory[item.color]) {
      sizeInventory[item.color] = {
        [item.size]: item.inventory,
      };
    } else {
      sizeInventory[item.color] = {
        ...sizeInventory[item.color],
        [item.size]: item.inventory,
      };
    }
  });

  return {
    ...details,
    colors,
    imgs,
    inventory: sizeInventory,
  };
}
