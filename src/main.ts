import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, Settings, SilhouetteSettingTab } from "./settings";
import { AppHelper } from "./app-helper";
import { TaskRepositoryImpl } from "./repository/TaskRepositoryImpl";
import { TaskService } from "./app/TaskService";
import { TaskServiceImpl } from "./app/TaskServiceImpl";
import { DateTime } from "owlelia";

export default class SilhouettePlugin extends Plugin {
  settings: Settings;
  appHelper: AppHelper;
  taskService: TaskService;

  async onload() {
    await this.loadSettings();
    this.appHelper = new AppHelper(this.app);
    const repository = new TaskRepositoryImpl(
      this.appHelper,
      this.settings.taskFilePath
    );
    this.taskService = new TaskServiceImpl(this.appHelper, repository);

    this.addCommand({
      id: "insert-tasks",
      name: "Insert tasks",
      checkCallback: (checking: boolean) => {
        if (this.appHelper.getActiveMarkdownView()) {
          if (!checking) {
            this.taskService.insertTasksToDailyNote(DateTime.now());
          }
          return true;
        }
      },
    });

    this.addSettingTab(new SilhouetteSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
