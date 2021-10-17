export { newGuid };

function newGuid() {
  var hexValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
  var oct = '',
    tmp;
  for (var a = 0; a < 4; a++) {
    tmp = (4294967296 * Math.random()) | 0;
    oct +=
      hexValues[tmp & 0xf] +
      hexValues[(tmp >> 4) & 0xf] +
      hexValues[(tmp >> 8) & 0xf] +
      hexValues[(tmp >> 12) & 0xf] +
      hexValues[(tmp >> 16) & 0xf] +
      hexValues[(tmp >> 20) & 0xf] +
      hexValues[(tmp >> 24) & 0xf] +
      hexValues[(tmp >> 28) & 0xf];
  }

  // "Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively"
  var clockSequenceHi = hexValues[(8 + Math.random() * 4) | 0];
  return (
    oct.substr(0, 8) +
    '-' +
    oct.substr(9, 4) +
    '-4' +
    oct.substr(13, 3) +
    '-' +
    clockSequenceHi +
    oct.substr(16, 3) +
    '-' +
    oct.substr(19, 12)
  );
}
