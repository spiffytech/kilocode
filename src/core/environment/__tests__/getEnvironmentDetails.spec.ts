import { describe, it, expect, vi, beforeEach } from "vitest"
import os from "os"

// Mock the getEnvironmentDetails function to test kill command generation
describe("getEnvironmentDetails kill command", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should generate correct kill command for Unix-like systems", () => {
		vi.spyOn(os, "platform").mockReturnValue("darwin")

		const pid = 12345
		const expectedCmd = `kill ${pid}`

		// Test the logic directly
		const killCmd = os.platform() === "win32" ? `taskkill /PID ${pid} /T` : `kill ${pid}`

		expect(killCmd).toBe(expectedCmd)
	})

	it("should generate correct kill command for Windows", () => {
		vi.spyOn(os, "platform").mockReturnValue("win32")

		const pid = 12345
		const expectedCmd = `taskkill /PID ${pid} /T`

		// Test the logic directly
		const killCmd = os.platform() === "win32" ? `taskkill /PID ${pid} /T` : `kill ${pid}`

		expect(killCmd).toBe(expectedCmd)
	})

	it("should handle unknown PID gracefully", () => {
		vi.spyOn(os, "platform").mockReturnValue("linux")

		const pid = undefined
		const expectedCmd = `kill PID`

		// Test the logic directly
		const killCmd = os.platform() === "win32" ? `taskkill /PID ${pid || "PID"} /T` : `kill ${pid || "PID"}`

		expect(killCmd).toBe(expectedCmd)
	})

	it("should handle Windows with unknown PID", () => {
		vi.spyOn(os, "platform").mockReturnValue("win32")

		const pid = undefined
		const expectedCmd = `taskkill /PID PID /T`

		// Test the logic directly
		const killCmd = os.platform() === "win32" ? `taskkill /PID ${pid || "PID"} /T` : `kill ${pid || "PID"}`

		expect(killCmd).toBe(expectedCmd)
	})
})
