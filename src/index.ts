/**
 * Placeholder export. Replace it with the library's real API and keep the
 * rule: every public function has a test with a happy path and one failure case.
 */
export function hello(name: string): string {
	const trimmed = name.trim();
	if (trimmed === '') {
		throw new TypeError('hello: name must not be empty');
	}
	return `Hello, ${trimmed}!`;
}
