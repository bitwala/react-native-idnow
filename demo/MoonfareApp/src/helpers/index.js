export function getUserInitial({userName}) {
  const parts = userName ? userName.split(/[ -]/) : [];
  let initials = '';
  for (let i = 0; i < parts.length; i += 1) {
    initials += parts[i].charAt(0);
  }
  if (initials.length > 2 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, '');
  }
  initials = initials.substr(0, 2).toUpperCase();
  return initials;
}

export const checkImageExist = ({thumbnail}) => {
  fetch(thumbnail)
    .then(res => {
      if (res.status === 404) {
        return false;
      } else {
        return true;
      }
    })
    .catch(() => {
      return false;
    });
};

export const findUniqueMessages = ({allMessages}) => {
  const completeMessages = [].concat(allMessages).reverse();

  const uniqueMessages = completeMessages.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return uniqueMessages;
};
