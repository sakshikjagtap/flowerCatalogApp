const readComments = (guestBookSrc, read) => {
  return comments = JSON.parse(read(guestBookSrc));
};

exports.readComments = readComments;
