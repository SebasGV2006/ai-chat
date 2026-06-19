export async function GET() {
	return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
}

export async function POST() {
	return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
}
