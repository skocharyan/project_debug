import { createHmac } from 'crypto';

type TPayload = {
  verification_code: string;
  hash: string;
};

export function validatePayKickstartIpn(
  payload: TPayload,
  secretKey: string
): boolean {
  // Hash received
  const ipnHash = payload.hash;

  const payloadWithoutEncKeys = { ...payload };
  delete payloadWithoutEncKeys.hash;
  delete payloadWithoutEncKeys.verification_code;

  // Trim and omit empty/null values from the payload for hashing
  const entries = Object.entries(payloadWithoutEncKeys);
  const trimmedEntries = entries.filter(([, val]) => {
    const trimmedVal = val.trim();

    // '0' in PHP treated as falsy value
    return trimmedVal !== '0' && trimmedVal;
  });

  // Alphabetically sort IPN parameters by their key. This ensures
  // the params are in the same order as when Paykickstart
  // generated the verification code, in order to prevent
  // hash key invalidation due to POST parameter order.
  const sortedValues = trimmedEntries
    .map(([key]) => key)
    .sort()
    .map((key: keyof TPayload) => payload[key]);

  // Join all the values into a string, delimited by "|"
  const joinedValues = sortedValues.join('|');

  // Generate the hash using the imploded string and secret key
  const hashed = createHmac('sha1', secretKey)
    .update(joinedValues)
    .digest('hex');

  return hashed === ipnHash;
}
