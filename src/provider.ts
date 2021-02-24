/****************************************************************************\
 *                           SLI Docs for VS Code                           *
 *                                                                          *
 *                         Copyright © 2021 Aquefir                         *
 *                Released under Mozilla Public License 2.0.                *
\****************************************************************************/

import * as VSCode from 'vscode'

export class SLICodeLensProvider implements VSCode.CodeLensProvider {
	private codeLenses: Array<VSCode.CodeLens> = []
	private onChangeCodeLenses: VSCode.EventEmitter<void> =
		new VSCode.EventEmitter<void>()
	public readonly onDidChangeCodeLenses: VSCode.Event<void> =
		this.onChangeCodeLenses.event

	constructor() {
		VSCode.workspace.onDidChangeConfiguration((_) => {
			this.onChangeCodeLenses.fire();
		});
	}

	public provideCodeLenses(document: VSCode.TextDocument,
	token: VSCode.CancellationToken): Array<VSCode.CodeLens> |
	Thenable<Array<VSCode.CodeLens>> {
		if(VSCode.workspace.getConfiguration('vscode-sli').get('enable', false)) {
			return []
		}

		return this.codeLenses
	}
}
